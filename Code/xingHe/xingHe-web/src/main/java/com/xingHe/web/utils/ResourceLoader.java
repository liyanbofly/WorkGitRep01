package com.xingHe.web.utils;

import org.springframework.beans.factory.config.YamlPropertiesFactoryBean;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.net.URL;
import java.util.Enumeration;
import java.util.Properties;

/**
 * @Date 2020/4/9 15:26
 */
public class ResourceLoader {
    private static final String PROPERTIES_FILE_EXTENSION = ".properties";
    private static final String YAML_FILE_EXTENSION = ".yml";

    /**
     * 加载classpath下文件,支持.properties和yml类型
     * test.yml , config/test.properties
     * @param fileName
     * @return
     * @throws Exception
     */
    public static Properties getSource(String fileName) throws Exception {
        ClassLoader classLoader = ResourceLoader.class.getClassLoader();
        Enumeration<URL> config = classLoader.getResources("");
        URL url = config.nextElement();
        String protocol = url.getProtocol();
        if ("jar".startsWith(protocol)) {
            fileName = url + fileName;
        }


        Properties properties = null;
        if (fileName.endsWith(PROPERTIES_FILE_EXTENSION)) {
            properties = PropertiesLoaderUtils.loadAllProperties(fileName);
        } else if (fileName.endsWith(YAML_FILE_EXTENSION)) {
            Resource resource = new DefaultResourceLoader().getResource(fileName);
            YamlPropertiesFactoryBean factory = new YamlPropertiesFactoryBean();
            factory.setResources(resource);
            properties = factory.getObject();
        }

        return properties;
    }
}
