package org.doctype.servlet;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public abstract class DocTypeServlet extends HttpServlet implements Servlet {
   
	private static final long serialVersionUID = -6083747188316228255L;
	
	protected abstract void processRequest(HttpServletRequest request, HttpServletResponse response);
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}
	
	protected void setToRequest(HttpServletRequest request, String key, Object value) {
		request.setAttribute(key, value);
	}
	
	@SuppressWarnings("unchecked")
	protected <T> T getFromRequest(HttpServletRequest request, String key, Object value) {
		return (T) request.getAttribute(key);
	}
	
	protected void setToSession(HttpServletRequest request, String key, Object value) {
		request.getSession().setAttribute(key, value);
	}
	
	@SuppressWarnings("unchecked")
	protected <T> T getFromSession(HttpServletRequest request, String key, Object value) {
		return (T) request.getSession().getAttribute(key);
	}
}