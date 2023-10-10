let searchWord = '';

async function getSearchResult() { // 검색 결과 보여주는 함수
    searchWord = $('#search').val();

    if (searchWord == '김성훈')
        location.href = 'sunghun.html'; // 김성훈님
    else if (searchWord == '김민선')
        location.href = 'minsunpage.html'; // 김민선님
    else if (searchWord == '유민아')
        location.href = 'minahpage.html'; // 유민아님
    else if (searchWord == '이예진')
        location.href = 'yejinpage.html'; // 이예진님
    else
        alert(`${searchWord} 에 대한 검색 결과를 찾을 수 없습니다.`);
}

$('#search').keydown(function (e) { // enter 눌렀을 때 검색어 가져와서 전달
    if (e.keyCode == 13) {
        e.preventDefault();
        getSearchResult();
    }
})