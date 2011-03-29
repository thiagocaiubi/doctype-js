import nl.captcha.text.producer.DefaultTextProducer;

import org.apache.commons.lang.StringEscapeUtils;

public class Main {

	public static void main(String[] args) {
	 	System.out.println(StringEscapeUtils.escapeJava("Thiago\nCaiubi<script>window.location.href = 'http://www.google.com.br'</script>"));
	 	
	 	System.out.println(System.getProperty("java.io.tmpdir"));
	 	
	 	System.out.println(new DefaultTextProducer(10));
	}
}