package com.pfe.notification.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.queue.notification}")
    private String notificationQueue;

    @Value("${rabbitmq.queue.dlq}")
    private String dlqQueue;

    @Value("${rabbitmq.routing-key.commit-created}")
    private String commitCreatedRoutingKey;

    // ─── Exchange ─────────────────────────────────────────────────────────────
    @Bean
    public TopicExchange pfeEventsExchange() {
        return new TopicExchange(exchange, true, false);
    }

    // ─── Queues ────────────────────────────────────────────────────────────────
    @Bean
    public Queue notificationQueue() {
        return QueueBuilder.durable(notificationQueue)
                .withArgument("x-dead-letter-exchange", "")
                .withArgument("x-dead-letter-routing-key", dlqQueue)
                .build();
    }

    @Bean
    public Queue deadLetterQueue() {
        return QueueBuilder.durable(dlqQueue).build();
    }

    // ─── Bindings ─────────────────────────────────────────────────────────────
    @Bean
    public Binding notificationBinding(Queue notificationQueue, TopicExchange pfeEventsExchange) {
        return BindingBuilder
                .bind(notificationQueue)
                .to(pfeEventsExchange)
                .with(commitCreatedRoutingKey);
    }

    // ─── JSON Message Converter ────────────────────────────────────────────────
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(jsonMessageConverter());
        return template;
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
            ConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(jsonMessageConverter());
        return factory;
    }
}
