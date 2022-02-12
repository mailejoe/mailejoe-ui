interface GenerateCsvProps {
  name: string;
  data?: Array<Array<string>>;
  fields: Array<string>;
}

export const generateCsv = (props: GenerateCsvProps) => {
  const headers = props.fields
    .map(item => (typeof item === 'string' && item.indexOf(',') >= 0 ? `"${item}"` : String(item)))
    .join(',');

  const rows = (props.data || []).map(row => row.join(',')).join('\n');

  const csv = `${headers}
${rows}`;

  const data = encodeURI('data:text/csv;charset=utf-8,' + csv);

  const link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', `${props.name}.csv`);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
