package com.project.paf;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.paf.modules.user.model.Role;
import com.project.paf.modules.user.model.User;
import com.project.paf.modules.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class AuthenticationRegressionTest {
    @Autowired MockMvc mvc;
    @Autowired UserRepository users;
    @Autowired ObjectMapper json;

    private User saveUser(Role role) {
        User user = new User();
        user.setName("Regression user");
        user.setEmail("regression-" + role + "@example.com");
        user.setPassword("private-password-hash");
        user.setRole(role);
        return users.save(user);
    }

    private MockHttpSession session(User user) {
        MockHttpSession session = new MockHttpSession();
        session.setAttribute("user", user);
        return session;
    }

    @Test
    void emailHeaderCannotImpersonateAnAdmin() throws Exception {
        User admin = saveUser(Role.ADMIN);
        for (String path : new String[]{"/api/admin/users", "/api/bookings/my",
                "/api/notifications", "/api/admin/audit-logs", "/api/tickets"}) {
            mvc.perform(get(path).header("X-User-Email", admin.getEmail()))
                    .andExpect(status().isUnauthorized());
        }
    }

    @Test
    void adminSessionWorksWithoutEmailHeader() throws Exception {
        mvc.perform(get("/api/admin/users").session(session(saveUser(Role.ADMIN))))
                .andExpect(status().isOk());
    }

    @Test
    void ordinaryUserCannotPerformAdministrativeBookingActions() throws Exception {
        MockHttpSession session = session(saveUser(Role.USER));
        mvc.perform(get("/api/bookings").session(session)).andExpect(status().isForbidden());
        mvc.perform(delete("/api/bookings/1").session(session)).andExpect(status().isForbidden());
        mvc.perform(put("/api/bookings/1/confirm").session(session)).andExpect(status().isForbidden());
        mvc.perform(put("/api/bookings/1/reject").session(session)).andExpect(status().isForbidden());
    }

    @Test
    void passwordIsAcceptedAsInputButNeverSerialized() throws Exception {
        User user = json.readValue("{\"password\":\"secret\"}", User.class);
        assertEquals("secret", user.getPassword());
        assertFalse(json.readTree(json.writeValueAsString(user)).has("password"));
    }
}
