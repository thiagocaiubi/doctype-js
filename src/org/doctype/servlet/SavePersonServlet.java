package org.doctype.servlet;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.doctype.DocType;

public class SavePersonServlet extends DocTypeServlet {

	private static final long serialVersionUID = -5163471604997494222L;
	
	private static final Set<String> PEOPLE = new HashSet<String>(); 

	@Override
	protected void processRequest(HttpServletRequest request, HttpServletResponse response) {
		String name = request.getParameter(DocType.NAME);
		PEOPLE.add(name);
		setToRequest(request, DocType.PEOPLE, PEOPLE);
	}
}