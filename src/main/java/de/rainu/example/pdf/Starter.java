package de.rainu.example.pdf;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;

import com.lowagie.text.DocumentException;

public class Starter {

	public static void main(String[] args) throws FileNotFoundException, DocumentException {
	   //System.out.println(Thread.currentThread().getContextClassLoader().getResource(""));  
       // System.out.println(Starter.class.getClassLoader().getResource(""));  
       // System.out.println(ClassLoader.getSystemResource(""));  
       //System.out.println(Starter.class.getResource(""));  
   //System.out.println(Starter.class.getResource("/"));
       //Class文件所在路径
       //System.out.println(new File("/").getAbsolutePath());  
       //System.out.println(System.getProperty("user.dir"));  
		
		PDFGenerator gen = new PDFGenerator("templates/", ".html");
		String classPathUrl = Starter.class.getResource("").toString();
		String Url =classPathUrl+"0.jpg";
		System.out.println(Url);
		System.out.println("file:/C:/Users/Administrator.WIN7-1610080938/Desktop/word2pdf/360_log.png");
		Map<String, Object> model = new HashMap<>();
		model.put("message", "Hallo Weltfsadfasdf打了分开就爱施蒂利克!");
		model.put("imgUrl",Url);
//		gen.generate(new File("C:/Users/Administrator.WIN7-1610080938/Desktop/word2pdf/test.pdf"), "contract", model);
		gen.generate(new File("C:/Users/fengg/Desktop/test.pdf"), "contract", model);

	}

}
