package org.dexterity.darueira.azimuteerp.monolith.springreact.security;

import java.util.Optional;
import org.dexterity.darueira.azimuteerp.monolith.springreact.config.Constants;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

/**
 * Implementation of {@link AuditorAware} based on Spring Security.
 */
@Component
public class SpringSecurityAuditorAware implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of(SecurityUtils.getCurrentUserLogin().orElse(Constants.SYSTEM));
    }
}
