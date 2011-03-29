package org.doctype.view;

import net.sourceforge.stripes.action.ActionBeanContext;

public class CustomActionBeanContext extends ActionBeanContext {

	private static final String CONTEXT = "CONTEXT";

	public Context getContext() {
		Context context = (Context) getRequest().getSession().getAttribute(CONTEXT);
		if (context == null) {
			context = new Context();
			setContext(context);
		}
		return context;
	}

	public void setContext(Context context) {
		getRequest().getSession().setAttribute(CONTEXT, context);
	}
	
	public void logout() {
		getRequest().getSession().invalidate();
	}
	
	@SuppressWarnings("unchecked")
	public <T> T getFromSession(String key) {
		return (T) getRequest().getSession().getAttribute(key);
	}
	
	public void setToSession(String key, Object value) {
		getRequest().getSession().setAttribute(key, value);
	}

	@SuppressWarnings("unchecked")
	public <T> T getFromRequest(String key) {
		return (T) getRequest().getAttribute(key);
	}
	
	public void setToRequest(String key, Object value) {
		getRequest().setAttribute(key, value);
	}

	public class Context {
	
		private Object detail;

		public Object getDetail() {
			return detail;
		}

		public void setDetail(Object detail) {
			this.detail = detail;
		}
	}
}