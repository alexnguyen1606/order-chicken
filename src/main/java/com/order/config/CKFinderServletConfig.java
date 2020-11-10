package com.order.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CKFinderServletConfig {

    @Value("${ckeditor.storage.image.path}")
    private String baseDir;
    @Value("${ckeditor.access.image.url}")
    private String baseURL;

//    @Bean
//    public ServletRegistrationBean connectCKFinder(){
//        ServletRegistrationBean registrationBean=new ServletRegistrationBean(new ConnectorServlet(),"/admin/ckfinder/core/connector/java/connector.java");
//        registrationBean.addInitParameter("XMLConfig","classpath:/static/ckfinder.xml");
//        registrationBean.addInitParameter("debug","false");
//        registrationBean.addInitParameter("configuration","eln.backendui.config.CKFinderConfig");
//        //ckfinder.xml
//        registrationBean.addInitParameter("baseDir",baseDir);
//        registrationBean.addInitParameter("baseURL",baseURL);
//        return registrationBean;
//    }

}
