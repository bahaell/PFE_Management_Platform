package com.pfe.chat.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE_NAME = "chat.exchange";
    public static final String CHAT_EVENTS_QUEUE = "chat.events.queue";
    public static final String ROUTING_KEY_NEW_MESSAGE = "chat.event.new_message";

    @Bean
    public TopicExchange chatExchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue chatEventsQueue() {
        return new Queue(CHAT_EVENTS_QUEUE, true);
    }

    @Bean
    public Binding bindingChatEventsQueue(Queue chatEventsQueue, TopicExchange chatExchange) {
        return BindingBuilder.bind(chatEventsQueue).to(chatExchange).with("chat.event.*");
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
