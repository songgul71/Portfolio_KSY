# 고소영 포트폴리오

설치나 빌드 없이 실행하는 HTML5 · CSS3 · JavaScript 원페이지입니다.

## 실행

압축을 푼 뒤 `index.html`을 브라우저로 여세요. 인터넷 연결 없이도 폰트, AOS 효과, 프로젝트 이미지, PDF가 표시됩니다. 파일과 assets 폴더의 상대 위치를 유지해 주세요.

## 파일 구성

- `index.html`: 페이지 구조, 문구, 프로젝트·이력서·Figma 링크
- `css/style.css`: 컬러, 글꼴, 레이아웃, 반응형 스타일
- `js/main.js`: AOS 설정, 현재 섹션 표시, 스크롤 진행 표시, 이메일 복사
- `assets/`: 폰트, AOS 파일, 이미지, 프로젝트 PDF, 이력서, 라이선스

React, Bootstrap, jQuery, npm, 빌드 도구는 사용하지 않습니다.

## 수정 위치

- 컬러: `css/style.css` 상단 `:root`의 `--background`, `--text`, `--accent`
- 전체 폭: `css/style.css`의 `--content-width`
- 문구·경력·연락처: `index.html`
- 프로젝트 PDF 교체: `assets/`의 해당 PDF를 교체하거나 `index.html`에서 경로 수정
- 이메일 변경: `mailto:` 링크와 `data-copy-email` 값을 함께 수정
- AOS 속도·거리·반복: `js/main.js`의 `window.AOS.init()` 옵션과 `css/style.css` 하단 AOS 구간

## 인터랙션

- AOS fade-up: 본문이 스크롤 위치에 맞춰 24px 아래에서 나타납니다. 기본 650ms, 한 번만 실행합니다.
- 카드·링크 hover 및 키보드 포커스
- 스크롤에 맞춘 상단 메뉴 현재 위치 표시와 읽기 진행선
- 이메일 주소 복사 및 결과 안내
- OS의 동작 줄이기 설정에서는 AOS와 부드러운 스크롤을 끕니다.
- JavaScript가 꺼져 있거나 AOS 로딩에 실패해도 본문과 링크는 표시됩니다.

## 자료

프로젝트 및 이력서는 제공받은 PDF를 그대로 포함했습니다. DPP와 시드물 이미지는 해당 PDF에 실린 작업 화면을 사용했습니다. Figma의 열람 권한은 Figma 파일의 공유 설정을 따릅니다.

AOS와 Pretendard의 라이선스는 assets 폴더에 포함되어 있습니다. 이 페이지는 기존 Bootstrap 템플릿을 사용하지 않고 새로 작성했습니다.

## 경로와 반응형 구성

CSS는 `css/style.css`, JavaScript는 `js/main.js`에 있습니다. `index.html`의 연결 경로와 CSS 내부 폰트 경로(`../assets/`)도 이 구조에 맞춰져 있습니다. AOS 파일은 기존처럼 assets 폴더에서 불러옵니다.

PC 기본 스타일과 HTML의 내용·요소 구조는 유지했습니다. 701–900px에서는 첫 화면·프로젝트·소개 영역을 세로로 배치하고, 700px 이하 및 380px 이하에서는 기존 모바일 규칙과 작은 화면의 넘침 보정을 적용합니다.
