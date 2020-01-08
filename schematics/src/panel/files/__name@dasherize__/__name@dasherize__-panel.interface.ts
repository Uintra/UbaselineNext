<%
  const panelClassName = 'I' + classify(name + 'Panel');
%>export interface <%= panelClassName%> {
  contentTypeAlias: string;
}