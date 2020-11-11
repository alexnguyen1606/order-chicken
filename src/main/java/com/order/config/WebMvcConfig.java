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


		registry.addResourceHandler("/admin/static/**").addResourceLocations("/static/");
		registry.addResourceHandler("/admin/ckfinder/**").addResourceLocations("/admin/template/ckfinder/");
		registry.addResourceHandler("/admin/ckeditor/**").addResourceLocations("/admin/template/ckeditor/");
		registry.addResourceHandler("/admin/template/**").addResourceLocations("/admin/template/");
		registry.addResourceHandler("/admin/image/**").addResourceLocations("/admin/image/");
		registry.addResourceHandler("/admin/css/**").addResourceLocations("/admin/css/");
		registry.addResourceHandler("/admin/images/**").addResourceLocations(uploadImageFolder);

		registry.addResourceHandler("/public/image/**").addResourceLocations(uploadImageFolder2);


		super.addResourceHandlers(registry);
	}

}
