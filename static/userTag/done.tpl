{%foreach $data as $i => $item%}
<tr>
    <td>
      {%$item.lemmaTitle%}
    </td>
    <td>已提交</td>
    <td>{%$item.updateTime|date_format:'%Y.%m.%d'%}</td>
    <td>{%$item.statusDesc%}</td>
</tr>
{%/foreach%}