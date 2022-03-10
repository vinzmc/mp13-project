package com.haibca.server.helper;

public interface HashHandlerConstructor {
    String generateRandomString(int n);
    String toSHA256(String s);
}
