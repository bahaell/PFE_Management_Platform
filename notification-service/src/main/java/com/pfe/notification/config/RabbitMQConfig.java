package com.pfe.notification.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.boot.autoconfigure.amqp.SimpleRabbitListenerContainerFactoryConfigurer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE = "pfe.events.exchange";

    // ─── Defense Exchange (produit par scheduling-service) ────────────────────
    public static final String DEFENSE_EXCHANGE            = "defense.exchange";
    public static final String DEFENSE_CREATED_QUEUE      = "defense.created.notification.queue";
    public static final String DEFENSE_UPDATED_QUEUE      = "defense.updated.notification.queue";
    public static final String DEFENSE_CANCELLED_QUEUE    = "defense.cancelled.notification.queue";
    public static final String DEFENSE_RESCHEDULED_QUEUE  = "defense.rescheduled.notification.queue";

    // ─── Chat Exchange (produit par chat-service) ──────────────────────────────
    public static final String CHAT_EXCHANGE = "chat.exchange";
    public static final String CHAT_NOTIFICATION_QUEUE = "chat.notification.queue";
    public static final String CHAT_ROUTING_KEY = "chat.event.new_message";

    @Value("${rabbitmq.queue.notification}") private String queueCommit;
    @Value("${rabbitmq.queue.subject}")      private String queueSubject;
    @Value("${rabbitmq.queue.subject-updated}") private String queueSubjectUpdated;
    @Value("${rabbitmq.queue.project}")      private String queueProject;
    @Value("${rabbitmq.queue.message}")      private String queueMessage;
    @Value("${rabbitmq.queue.task-assigned}") private String queueTaskAssigned;
    @Value("${rabbitmq.queue.task-updated}") private String queueTaskUpdated;
    @Value("${rabbitmq.queue.document-uploaded}") private String queueDocUploaded;
    @Value("${rabbitmq.queue.doc-generated}") private String queueDocGenerated;
    @Value("${rabbitmq.queue.doc-requested}") private String queueDocRequested;
    @Value("${rabbitmq.queue.defense-request}") private String queueDefenseRequest;
    @Value("${rabbitmq.queue.defense-scheduled}") private String queueDefenseScheduled;
    @Value("${rabbitmq.queue.jury}")         private String queueJury;
    @Value("${rabbitmq.queue.user}")         private String queueUser;
    @Value("${rabbitmq.queue.deadline}")     private String queueDeadline;
    @Value("${rabbitmq.queue.dlq}")          private String queueDlq;
    @Value("${rabbitmq.queue.chat-message:chat.notification.queue}") private String queueChatMessage;

    // ─── Exchange ─────────────────────────────────────────────────────────────
    @Bean
    public TopicExchange pfeEventsExchange() {
        return new TopicExchange(EXCHANGE, true, false);
    }

    // ─── Queues (with DLQ fallback) ───────────────────────────────────────────
    private Queue durableQueue(String name) {
        return QueueBuilder.durable(name)
                .withArgument("x-dead-letter-exchange", "")
                .withArgument("x-dead-letter-routing-key", queueDlq)
                .build();
    }

    @Bean public Queue notificationQueue()    { return durableQueue(queueCommit); }
    @Bean public Queue subjectQueue()         { return durableQueue(queueSubject); }
    @Bean public Queue subjectUpdatedQueue()  { return durableQueue(queueSubjectUpdated); }
    @Bean public Queue projectQueue()         { return durableQueue(queueProject); }
    @Bean public Queue messageQueue()         { return durableQueue(queueMessage); }
    @Bean public Queue taskAssignedQueue()    { return durableQueue(queueTaskAssigned); }
    @Bean public Queue taskUpdatedQueue()     { return durableQueue(queueTaskUpdated); }
    @Bean public Queue docUploadedQueue()     { return durableQueue(queueDocUploaded); }
    @Bean public Queue docGeneratedQueue()    { return durableQueue(queueDocGenerated); }
    @Bean public Queue docRequestedQueue()    { return durableQueue(queueDocRequested); }
    @Bean public Queue defenseRequestQueue()  { return durableQueue(queueDefenseRequest); }
    @Bean public Queue defenseScheduledQueue(){ return durableQueue(queueDefenseScheduled); }
    @Bean public Queue juryQueue()            { return durableQueue(queueJury); }
    @Bean public Queue userQueue()            { return durableQueue(queueUser); }
    @Bean public Queue deadlineQueue()        { return durableQueue(queueDeadline); }
    @Bean public Queue deadLetterQueue()      { return QueueBuilder.durable(queueDlq).build(); }

    // ─── Defense Exchange Queues ──────────────────────────────────────────────
    @Bean public Queue defenseCreatedNotifQueue()     { return QueueBuilder.durable(DEFENSE_CREATED_QUEUE).withArgument("x-dead-letter-exchange", "").withArgument("x-dead-letter-routing-key", queueDlq).build(); }
    @Bean public Queue defenseUpdatedNotifQueue()     { return QueueBuilder.durable(DEFENSE_UPDATED_QUEUE).withArgument("x-dead-letter-exchange", "").withArgument("x-dead-letter-routing-key", queueDlq).build(); }
    @Bean public Queue defenseCancelledNotifQueue()   { return QueueBuilder.durable(DEFENSE_CANCELLED_QUEUE).withArgument("x-dead-letter-exchange", "").withArgument("x-dead-letter-routing-key", queueDlq).build(); }
    @Bean public Queue defenseRescheduledNotifQueue() { return QueueBuilder.durable(DEFENSE_RESCHEDULED_QUEUE).withArgument("x-dead-letter-exchange", "").withArgument("x-dead-letter-routing-key", queueDlq).build(); }

    // ─── Defense Exchange (scheduling-service) ───────────────────────────────
    @Bean
    public TopicExchange defenseExchange() {
        return new TopicExchange(DEFENSE_EXCHANGE, true, false);
    }

    @Bean public Binding defenseCreatedBinding()     { return BindingBuilder.bind(defenseCreatedNotifQueue()).to(defenseExchange()).with("defense.created"); }
    @Bean public Binding defenseUpdatedBinding()     { return BindingBuilder.bind(defenseUpdatedNotifQueue()).to(defenseExchange()).with("defense.updated"); }
    @Bean public Binding defenseCancelledBinding()   { return BindingBuilder.bind(defenseCancelledNotifQueue()).to(defenseExchange()).with("defense.cancelled"); }
    @Bean public Binding defenseRescheduledBinding() { return BindingBuilder.bind(defenseRescheduledNotifQueue()).to(defenseExchange()).with("defense.rescheduled"); }

    // ─── Chat Queue (liée à chat.exchange, pas à pfe.events.exchange) ─────────
    @Bean
    public Queue chatNotificationQueue() {
        return QueueBuilder.durable(CHAT_NOTIFICATION_QUEUE)
                .withArgument("x-dead-letter-exchange", "")
                .withArgument("x-dead-letter-routing-key", queueDlq)
                .build();
    }

    @Bean
    public TopicExchange chatExchange() {
        return new TopicExchange(CHAT_EXCHANGE, true, false);
    }

    @Bean
    public Binding chatNotificationBinding() {
        // Binding spécifique : chat.exchange → chat.notification.queue via routing key chat.event.new_message
        // Le chat-service publie avec cette routing key pour chaque nouveau message Firestore.
        return BindingBuilder
                .bind(chatNotificationQueue())
                .to(chatExchange())
                .with(CHAT_ROUTING_KEY);
    }

    // ─── Bindings ─────────────────────────────────────────────────────────────
    @Bean public Binding commitBinding()          { return bind(notificationQueue(), "commit.created"); }
    @Bean public Binding subjectCreatedBinding()  { return bind(subjectQueue(), "subject.application.created"); }
    @Bean public Binding subjectUpdatedBinding()  { return bind(subjectUpdatedQueue(), "subject.application.updated"); }
    @Bean public Binding projectBinding()         { return bind(projectQueue(), "project.created"); }
    @Bean public Binding messageBinding()         { return bind(messageQueue(), "message.sent"); }
    @Bean public Binding taskAssignedBinding()    { return bind(taskAssignedQueue(), "task.assigned"); }
    @Bean public Binding taskUpdatedBinding()     { return bind(taskUpdatedQueue(), "task.updated"); }
    @Bean public Binding docUploadedBinding()     { return bind(docUploadedQueue(), "document.uploaded"); }
    @Bean public Binding docGeneratedBinding()    { return bind(docGeneratedQueue(), "academic.document.generated"); }
    @Bean public Binding docRequestedBinding()    { return bind(docRequestedQueue(), "academic.document.requested"); }
    @Bean public Binding defenseRequestBinding()  { return bind(defenseRequestQueue(), "defense.request.created"); }
    @Bean public Binding defenseScheduledBinding(){ return bind(defenseScheduledQueue(), "defense.scheduled"); }
    @Bean public Binding juryBinding()            { return bind(juryQueue(), "jury.assigned"); }
    @Bean public Binding userBinding()            { return bind(userQueue(), "user.created"); }
    @Bean public Binding deadlineBinding()        { return bind(deadlineQueue(), "deadline.reminder"); }

    private Binding bind(Queue queue, String routingKey) {
        return BindingBuilder.bind(queue).to(pfeEventsExchange()).with(routingKey);
    }

    // ─── JSON Converter ───────────────────────────────────────────────────────
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
            SimpleRabbitListenerContainerFactoryConfigurer configurer,
            ConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        configurer.configure(factory, connectionFactory);
        factory.setMessageConverter(jsonMessageConverter());
        return factory;
    }
}
