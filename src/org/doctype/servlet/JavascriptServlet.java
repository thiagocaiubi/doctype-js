package org.doctype.servlet;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JavascriptServlet extends HttpServlet implements Servlet {

	private static final long serialVersionUID = -6392095412736827920L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		StringBuilder script = new StringBuilder();
		script.append("function teste(){ window.alert(\"Thiago Caiubi\");}");
		response.setContentType("text/javascript");
		response.getWriter().print(script.toString());
	}  	
}