document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const contentContainer = document.getElementById('textContent');

    // 원본 HTML을 저장하기 위한 변수를 선언합니다.
    let originalHTML = contentContainer.innerHTML;

    searchInput.addEventListener('input', () => {
        let searchText = searchInput.value.trim();

        // 검색어가 없으면 원본 HTML로 복원합니다.
        if (!searchText) {
            contentContainer.innerHTML = originalHTML;
            return;
        }

        // 원본 HTML을 복원합니다.
        contentContainer.innerHTML = originalHTML;

        // 모든 TextNode를 찾아서 검색어가 포함되어 있는지 확인합니다.
        function highlightText(node) {
            if (node.nodeType === 3) { // TextNode인 경우
                const nodeText = node.nodeValue;
                const indexOfMatch = nodeText.toLowerCase().indexOf(searchText.toLowerCase());

                if (indexOfMatch >= 0) { // 검색어가 포함되어 있는 경우
                    const highlightedText = document.createElement('span');
                    highlightedText.classList.add('highlight');
                    highlightedText.textContent = nodeText.substring(indexOfMatch, indexOfMatch + searchText.length);

                    const beforeText = document.createTextNode(nodeText.substring(0, indexOfMatch));
                    const afterText = document.createTextNode(nodeText.substring(indexOfMatch + searchText.length));

                    const parentNode = node.parentNode;
                    parentNode.insertBefore(beforeText, node);
                    parentNode.insertBefore(highlightedText, node);
                    parentNode.insertBefore(afterText, node);
                    parentNode.removeChild(node);
                }
            } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') { // ElementNode이고, SCRIPT나 STYLE 태그가 아닌 경우
                node.childNodes.forEach(childNode => highlightText(childNode));
            }
        }

        highlightText(contentContainer);
    });
});
window.addEventListener('scroll', function() {
    var footer = document.querySelector('.footer');
    var windowHeight = window.innerHeight;
    var scrollY = window.scrollY || window.pageYOffset;
    var documentHeight = document.documentElement.scrollHeight;
    var thresholdForMain = windowHeight * 0.5; // 메인 컨텐츠가 나타나는 스크롤 위치
    var thresholdForFooter = documentHeight - windowHeight - 50; // 푸터가 나타나는 스크롤 위치

    // 스크롤 위치에 따라 푸터 표시/숨김
    if (scrollY > thresholdForFooter) {
        footer.classList.add('show-footer');
    } else {
        footer.classList.remove('show-footer');
    }
});
document.getElementById('seeMore').addEventListener('click', function() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});
let lastScrollY = window.scrollY;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // 스크롤을 내릴 때 헤더 숨기기
        header.style.top = '-120px'; // 헤더 높이만큼 숨기기
    } else {
        // 스크롤을 올릴 때 헤더 보이기
        header.style.top = '0';
    }
    lastScrollY = window.scrollY;
});

// 스크롤에 따라 헤더 배경을 변화시키는 함수
function adjustHeaderBackground() {
    const header = document.querySelector('header');
    const scrollPosition = window.pageYOffset;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
}

// 스크롤 이벤트 리스너 등록
window.addEventListener('scroll', adjustHeaderBackground);

// 페이지 로드 시 함수 실행하여 초기 위치 설정
window.onload = adjustHeaderBackground;
let lastScrollTop = 0; // 마지막 스크롤 위치를 저장할 변수

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // 아래로 스크롤할 때
        document.getElementById("header").classList.add("hidden-header");
    } else {
        // 위로 스크롤할 때
        document.getElementById("header").classList.remove("hidden-header");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 음수 값 방지
}, false);
