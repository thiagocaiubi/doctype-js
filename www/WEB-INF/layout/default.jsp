<%@ page contentType="text/xhtml;charset=ISO-8859-1" language="java"%>
<%@ taglib prefix="stripes" uri="http://stripes.sourceforge.net/stripes.tld"%>
<stripes:layout-definition>
	<?xml version="1.0" encoding="ISO-8859-1" ?>
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>
			<stripes:layout-component name="title">
				Stripes Spike
			</stripes:layout-component>
		</title>
		<base href="${pageContext.request.contextPath}">
		<meta http-equiv="Content-Type" content="text/xhtml; charset=ISO-8859-1" />
		<link rel="stylesheet" type="text/css" media="screen" href="${pageContext.request.contextPath}/css/default.css"/>
		<stripes:layout-component name="css" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/lib/prototype.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/default.js"></script>
		<stripes:layout-component name="js" />
	</head>
	<body>
		<div id="page">
			<div id="header">
				<stripes:layout-component name="header">
					<jsp:include page="header.jsp" />
				</stripes:layout-component>
			</div>
			<div id="middle">
				<stripes:layout-component name="middle">
					<div id="left">
						<stripes:layout-component name="left">
							<jsp:include page="menu.jsp" />	
						</stripes:layout-component>
					</div>
					<div id="right">
						<stripes:layout-component name="right" />
					</div>
				</stripes:layout-component>
			</div>
			<div id="footer">
				<stripes:layout-component name="footer">
					<jsp:include page="footer.jsp" />
				</stripes:layout-component>
			</div>
		</div>
	</body>
	</html>
</stripes:layout-definition>