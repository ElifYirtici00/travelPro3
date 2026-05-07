package com.sau.backend.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

public class homeController {
    @GetMapping("")
    public String getHome(){
        return "index";
    }

    @GetMapping("/about")
    public String getAbout() {
        return "about";
    }

}
