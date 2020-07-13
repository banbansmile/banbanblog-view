import request from './util/request'

const post_headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }

const fileHeaders = { headers: { "Content-Type": "multipart/form-data" } }


export function uploadFile(params) {
    return request.post('/file/fileUpload', params, fileHeaders)
}

export function getAriticleTypeList() {
    return request.get('/manager/getAriticleTypeList')
}

export function getTagList() {
    return request.get('/manager/getTagList')
}

export function saveAriticle(params){
    return request.post('/manager/saveAriticle',params,post_headers)
}

export function getAriticleList(params){
    return request.get("/manager/getAriticleList",params)
}

export function deleteAritile(id){
    return request.delete('/manager/ariticle/'+id)
}

export function addMod(params){
    return request.post('/manager/addMod',params,post_headers)
}

export function getModList(params){
    return request.get("/manager/getModList",params)
}

export function deleteMod(id){
    return request.delete('/manager/mod/'+id)
}



export function getCommonAriticleList(params){
    return request.get("/common/getAriticleList/",{ params: params })
}

export function getCommonAriticleById(id,params){
    return request.post("/common/ariticile/"+id,params)
}

export function addZanCount(id){
    return request.post("/common/ariticile/addZanCount/"+id,post_headers);
}

export function getAriticleCommentList(id,params){
    return request.get("/common/ariticleComment/getAriticleCommentList/"+id,{params:params})
}

export function getCommonModList(){
    return request.get("/common/getModList");
}

export function getAllAriticleSimpleInfo(){
    return request.get("/common/getAllAriticleSimpleInfo")
}

export function addLikeCount(id){
    return request.get("/common/ariticle/addLikeCount/"+id)
}

export function addDisLikeCount(id){
    return request.get("/common/ariticle/addDisLikeCount/"+id)
}


export function getTagAriticleCountList(){
    return request.get("/common/tag/getTagAriticleCountList")
}

export function sendEmail(params){
    return request.post("/common/user/sendEmail",params)
}

export function sendEmail1(params){
    return request.post("/common/user/sendEmail1",params)
}

export function userRegister(params){
    return request.post("/common/user/userRegister",params,post_headers)
}


export function userLogin(params){
    return request.post("/common/user/userLogin",params,post_headers)
}

export function updateUserName(params){
    return request.post("/user/updateUserName",params,post_headers)
}

export function updatePassword(params){
    return request.post("/user/updatePassword",params,post_headers)
}

export function updateEmail(params){
    return request.post("/user/updateEmail",params,post_headers)
}

export function getUserInfoByUserCode(params){
    return request.post("/user/getUserInfoByUserCode",params,post_headers)
}

export function updateImage(params){
    return request.post("/user/updateImage",params,post_headers)
}

export function findBackPassword(params){
    return request.post("/common/user/findBackPassword",params,post_headers)
}

export function isUserLogin(){
    return request.post("/common/user/isUserLogin")
}

export function addBlogComment(params){
    return request.post('/user/blogcomment/addBlogComment',params,post_headers)
}

export function getBlogComment(params){
    return request.get("/common/blogcomment/getBlogComment/",{ params: params }) 
}


export function addBlogCommentLike(id){
    return request.get("/common/blogcomment/addBlogCommentLike/"+id);
}

export function addBlogCommentDisLike(id){
    return request.get("/common/blogcomment/addBlogCommentDisLike/"+id);
}

export function getBlogCommentCount(){
    return request.get("/common/blogcomment/getBlogCommentCount");
}

export function addAriticleComment(params){
    return request.post('/user/ariticle/addAriticleComment',params)
}

export function getTop2AriticleCount(){
    return request.get('/common/ariticle/getTop2AriticleCount')
}