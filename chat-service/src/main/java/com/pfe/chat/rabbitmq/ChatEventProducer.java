package com.pfe.chat.rabbitmq;

import com.pfe.chat.dto.NewMessageEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatEventProducer {

    private final RabbitTemplate rabbitTemplate;

    public void publishNewMessageEvent(NewMessageEvent event) {
        log.info("Publishing new message event for room: {}", event.getRoomId());
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE_NAME, 
            RabbitMQConfig.ROUTING_KEY_NEW_MESSAGE, 
            event
        );
    }
}
