<%@ page pageEncoding="utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html lang="en">
<head>
  
   <tiles:insertAttribute name="head" />
 
</head>
<body class="hold-transition sidebar-mini layout-fixed">

 
  <tiles:insertAttribute name="menu" />


  <div class="content-wrapper">

  <tiles:insertAttribute name="body" />
  </div>
  

  <tiles:insertAttribute name="side" />



</body>
</html>