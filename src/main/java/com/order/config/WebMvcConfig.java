package com.order.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration

public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Value("${uploadimage.folder}")
    private String uploadImageFolder;

	@Value("${image.upload.folder2}")
	private String uploadImageFolder2;


	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		//   file:D:\\data\\file\\image\\
		/*registry.addResourceHandler("/public/image/**").addResourceLocations(uploadImageFolder);*/
		registry.addResourceHandler("/static/**").addResourceLocations("/static/");
		registry.addResourceHandler("/ckfinder/**").addResourceLocations("/template/ckfinder/");
		registry.addResourceHandler("/ckeditor/**").addResourceLocations("/template/ckeditor/");
		registry.addResourceHandler("/template/**").addResourceLocations("/template/");
		registry.addResourceHandler("/image/**").addResourceLocations("/image/");
		registry.addResourceHandler("/css/**").addResourceLocations("/css/");
		registry.addResourceHandler("/images/**").addResourceLocations(uploadImageFolder);

		registry.addResourceHandler("/public/image/**").addResourceLocations(uploadImageFolder2);


		super.addResourceHandlers(registry);
	}

}
