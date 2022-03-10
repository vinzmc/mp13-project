package com.haibca.server.service.impl;

import com.haibca.server.entity.User;
import com.haibca.server.helper.HashHandlerConstructor;
import com.haibca.server.repository.UserRepository;
import com.haibca.server.service.UserService;
import com.haibca.server.web.model.user.CreateUserRequest;
import com.haibca.server.web.model.user.UpdateUserRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    HashHandlerConstructor hashHandlerConstructor;

    @Override
    @Transactional(rollbackFor = {Exception.class})
    public User create(CreateUserRequest request) {
        //salt length = 32
        String salt = hashHandlerConstructor.generateRandomString(32);
        String encoded = hashHandlerConstructor.toSHA256(request.getUserPwd().concat(salt));

        request.setUserPwd(encoded);
        User user = User
                .builder()
                .userSalt(salt)
                .build();
        BeanUtils.copyProperties(request, user);

        return userRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Integer id) {
        return userRepository.findById(id).get();
    }

    @Override
    @Transactional(rollbackFor = {Exception.class})
    public User update(Integer id, UpdateUserRequest request) {
        User user = userRepository.getById(id);

        String encoded = request.getUserOldPwd().concat(user.getUserSalt());
        encoded = hashHandlerConstructor.toSHA256(encoded);
        if (encoded.equals(user.getUserPwd())) {
            String newPwdEncoded = hashHandlerConstructor.toSHA256(request.getUserNewPwd().concat(user.getUserSalt()));

            BeanUtils.copyProperties(request, user);
            user.setUserPwd(newPwdEncoded);

            return userRepository.save(user);
        }

        return null;
    }

    @Override
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public User findByEmail(String email) {
         return userRepository.getUserByEmail(email);
    }
}
