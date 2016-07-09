{%if $fromLemma == 1%}
	{%$realWidth = 168%}
	{%$realHeight = 226%}
	{%$realClass = "fromLemma"%}
{%else%}
	{%$realWidth = 182%}
	{%$realHeight = 246%}
	{%$realClass = ""%}
{%/if%}
{%$realHeight = $realHeight-44%}
{%foreach $lemmaList as $index => $item%}
{%if $item.lemmaPic.url%}
	{%$opcity = "waterFall_content_opacity"%}
{%else%}
	{%$opcity = ""%}
{%/if%}
<div class="waterFall_item {%$realClass%}">
	<a href="{%$item.lemmaUrl || ''%}" target="_blank"  hidefocus="true">
		<div class="flip">
			<div class="front">
				{%if $item.lemmaPic.url && $item.lemmaPic.width && $item.lemmaPic.height%}
				<div class="waterFall_img_wrap">
					{%$width = $item.lemmaPic.width%}
					{%$height = $item.lemmaPic.height%}
					<!-- {%if $width / $height > $realWidth / $realHeight%}
						{%$displayWidth = $width * $realHeight / $height%}
						{%$marginLeft = ($realWidth - $displayWidth) / 2%}
						{%$addStyle = "height:100%;margin-left:"|cat:$marginLeft|cat:"px;width:"|cat:$displayWidth|cat:"px;"%}
					{%else%}
						{%$displayHeight = $height * $realWidth / $width%}
						{%$marginTop = ($realHeight - $displayHeight) * 3 / 10%}
						{%$addStyle = "width:100%;margin-top:"|cat:$marginTop|cat:"px;height:"|cat:$displayHeight|cat:"px;"%}
					{%/if%} -->
					{%$displayHeight = $height * $realWidth / $width%}
					{%$marginTop = ($realHeight - $displayHeight) / 2%}
					{%$addStyle = "width:100%;margin-top:"|cat:$marginTop|cat:"px;height:"|cat:$displayHeight|cat:"px;"%}
					<img class="waterFall_img" srcd="{%$item.lemmaPic.url%}" style="{%$addStyle%}">
					<div class="waterFall_title">
						<span>{%$item.lemmaCroppedTitle%}</span>
					</div>	
				</div>
				{%else%}
				<div class="waterFall_content_wrap">
					<div class="waterFall_content_title">{%$item.lemmaCroppedTitle%}</div>
					<div class="waterFall_content_summary">{%$item.lemmaDesc%}</div>
				</div>
				{%/if%}
			</div>
			<div class="back">
				<div class="waterFall_content_wrap {%$opcity%}">
					<div class="waterFall_content_title" title="{%$item.lemmaTitle%}">{%$item.lemmaCroppedTitle%}</div>
					<div class="waterFall_content_summary">{%$item.lemmaDesc%}</div>
				</div>
				<div class="btn_wrap">
					<div class="waterFall_content_btn">
						<span>去查看</span>
					</div>
				</div>
			</div>	
		</div>
	</a>
</div>
{%/foreach%}