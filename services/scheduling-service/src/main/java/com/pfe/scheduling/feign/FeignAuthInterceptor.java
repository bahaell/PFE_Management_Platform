package com.pfe.scheduling.feign;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class FeignAuthInterceptor implements RequestInterceptor {

    @Value("${services.internal-token:}")
    private String internalToken;

    @Override
    public void apply(RequestTemplate template) {

        // 1. Propage le token JWT de la requête entrante si présent
        ServletRequestAttributes attrs =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attrs != null) {
            HttpServletRequest request = attrs.getRequest();
            String auth = request.getHeader("Authorization");
            if (auth != null && auth.startsWith("Bearer ")) {
                template.header("Authorization", auth);
                return;
            }
        }

        // 2. Sinon utilise le token interne configuré
        if (internalToken != null && !internalToken.isBlank()) {
            template.header("Authorization", "Bearer " + internalToken);
        }
    }
}