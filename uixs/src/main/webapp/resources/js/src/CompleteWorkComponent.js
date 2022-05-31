var competeWorkListTemplate = `
<dl v-if="show">
	<dt>
		<p>작업완료</p>
		<span class="list-count">{{list.length}}건</span>
	</dt>
	<dd>
	    <div class="work_factor complete" v-for="(item, index) in list">
	        <dl>
	            <dt>
	                <div>ID {{item.request_id}}</div>
	                <ul class="work_label">
						<li><a href="#none" class="work_label04">작업완료</a></li>
					</ul>
	                <a href="#none" @click="openDetail(item.request_id)">{{item.request_title}}</a>
	            </dt>
	            <dd>
	                <div class="work_area" v-html="getReplaceContent(item.request_content)"></div>
	                <div class="date_area">
	                    <span>~ {{new Date(item.end_date).format('yyyy.MM.dd')}} 까지</span>
	                </div>
	            </dd>
	        </dl>
	    </div>
	</dd>
</dl>`;

var CompleteWorkList = {
    template: competeWorkListTemplate,
    mixins:[channelMixin],
    props: ['propList'],
    data: function () {
        return {
            list: this.propList,
            show: false
        }
    },
    created: function () {
		if (this.list.length > 0){
			this.show = true;
		}
	},
    methods: {
		getReplaceContent: function (str) {
			return str.replace(/\r\n/g, '<br>');
		},
        openDetail: function (id) {
			this.$emit('show-detail', id, 'complete');
			//uijs.processWork.detailPopup(id, 'COMPLETE')
		}
    }
}