<template>
	<div>
		<table class="table">
			<thead>
				<tr>
					<th colspan="2">MVC 게시판-view페이지</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>지역</td>
					<td>{{board.board_LOCATION}}</td>
				</tr>
				<tr>
					<td>글쓴이</td>
					<td>{{board.board_NAME}}</td>
				</tr>
				
				<tr>
					<td>제목</td>
					<td>{{board.board_SUBJECT}}</td>
				</tr>
				<tr>
					<td>내용</td>
					<td><span v-html="board.board_CONTENT"></span></td>
				</tr>
				<tr >
					<td>첨부파일</td>
					<td v-if="board.board_FILE">
						<div @click="download"><img src="../../assets/attach.png">{{board.board_ORIGINAL}}</div>
					</td>
					<td v-else></td>
				</tr>
				<tr>
					<td colspan="2" >			
						<button class="btn btn-primary start">댓글</button>
						<span id="count">{{count}}</span>	

						<div 	class="group" 
								v-if="board.board_NAME == parent_id || parent_id == 'admin'">
							<router-link :to="{name:'Community_Update'}">
								<button class="btn btn-warning" >수정</button>
							</router-link>
							<button class="btn btn-danger"  @click="showModal">삭제</button>
						</div>
						<button class="btn btn-info" @click="reply">답변</button>
						<router-link :to="{name:'Community'}"><button class="btn btn-success">목록</button></router-link>
						
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { ref, computed} from 'vue';
import {useRoute} from 'vue-router';
import axios from '../../axios/axiossetting.js';
import {useStore} from 'vuex'; //추가
export default {
	props:{
		parent_id:{
			type:String,
			required:true
		}
	},
	emits:['parent_getSession'],
	setup(props, context){
		context.emit("parent_getSession");
		const num = useRoute().params.num;
		const reply = () =>{
			if (!props.parent_id == '') {
                num.push({
                    name : 'Community_Reply',
                });
            } else {
                alert('로그인이 필요한 서비스입니다')
            }
		}
		
		const board=ref({});
		
		const getDetail = async ()=>{
			try{
				const res=await axios.get(`communitys/${num}`);
				console.log(res.data);
				board.value = res.data.board;
			}catch(error){
				console.log(error);
			}
		}

		getDetail();


		const store=useStore();		
		const count = computed(()=>{
			return store.state.count;
		})	

		const download = async() =>{
			console.log(board.value.board_FILE);
			console.log(board.value.board_ORIGINAL);
			try{

			//Blob(Binary Large Object : Blob객체는 파일을 text나 2진 데이터 형태로 읽을 수 있습니다.)
				const res=await axios.get('boards/down',
									{ 	params:{
											filename : board.value.board_FILE , 
											original :board.value.board_ORIGINAL 
										},
										responseType:'blob'
									}
									
				);

				let bb = new Blob([res.data]);
				//URL.createObjectURL() 정적 메서드는 주어진 객체를 가리키는 URL을 DOMString으로 반환합니다.
				//DOMString은 UTF-16 문자열입니다. JavaScript의 String도 UTF-16 문자열이기 때문에 DOMString은 String으로 연결됩니다.
				//객체 URL을 해제하려면 revokeObjectURL()을 호출하세요.
				let url=window.URL.createObjectURL(bb);	

				//<a href="" download="파일오리지널이름"> 엘리먼트 생성 후 클릭=>다운로드 수행=>엘리먼트 제거
				const a=document.createElement('a'); //<a> 엘리먼트 생성
				let fileName = board.value.board_ORIGINAL;				
				console.log(`fileName=${fileName}`);//Lemon.png

				a.href=url;

				a.setAttribute('download',`${fileName}`);

				a.style.cssText = 'display:none';
/*
<a href="blob:http://localhost:8081/8a35f3a2-f371-42fc-a26c-c5e8aae5c6f8" download="Lemon.png" style="display: none;"></a>
*/
				console.log(a); 
				
				document.body.appendChild(a);
				a.click();
				a.remove();
				window.URL.revokeObjectURL(a.href);
			}catch(err){
				console.log(err)
			}
		}
		
		const showModal = ()=>{
			//store에 값을 변경합니다.
			store.dispatch('display', true);
		}
		

		return{
			board, count,
			download, showModal, reply
		}
	}
}
</script>

<style scoped>

 table > thead,table > tbody > tr:nth-last-child(1) {
	text-align: center
}

td:nth-child(1) {
	width: 20%
}

a {
	color: white
}

table > tbody >tr:nth-child(5)>td:nth-child(2)>a {
	color: black
}


.btn-primary {
	background-color: #4f97e5
}

.group{display: inline-block}
button{
	margin-left:20px;
}

#comment > table > tbody > tr > td:nth-child(2){
 width:60%
}
#count{
 position: relative;
    top: -10px;
    left: -10px;
    background: orange;
    color: white;
    border-radius: 30%;
}
img{
    width:  20px;
}
.table{font-size: x-large;}
</style>
