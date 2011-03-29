package org.doctype.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SleepServlet extends DocTypeServlet {

	private static final long serialVersionUID = -895490733279201056L;

	@Override
	protected void processRequest(HttpServletRequest request, HttpServletResponse response) {
		try {
			Thread.sleep(3000);
			response.getWriter().println("Ahaaa...");
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}