package com.yeeter.yeeterBackend.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "yeet")
public class Yeet {

    @Id
    private String id;

    private String content;

    private String media = "";

    @DBRef
    private User author;

    //jj@DBRef
    //private Group group;

    private Date timestamp = new Date();

    @DBRef
    private Yeet replyTo;

    @DBRef
    private Yeet thread;

    private String source;
}
