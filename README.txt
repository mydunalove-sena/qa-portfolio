이 폴더는 박정은 QA 포트폴리오 사이트입니다.

구성:
- index.html: 문제 발견 → 요구사항 → 검증 → 결과와 My Health Log 세 사례 중심 진입 페이지
- about.html: About 상세 페이지
- skills.html: Skills 상세 페이지
- career.html: Career 상세 페이지
- projects.html: Projects 상세 페이지
- my-health-log.html: 기존 사례 주소 보존, 첫 화면과 같은 사례 중심 구성 및 상세 근거
- contact.html: Contact 상세 페이지
- style.css: 전체 디자인 파일
- my-health-log.css, role-separation.css: 사례 페이지와 승인 비교 시안 기준 디자인
- my-health-log.js: 사례 펼침·접기, 상태/접근성 이름 동기화, 직접 주소 진입
- images/: 이미지 파일

공개 정책:
- 이력서, 이메일, 전화번호 등 개인정보는 사이트에 포함하지 않습니다.
- 채용 관련 연락은 지원한 채용 플랫폼을 통해 받습니다.
- 확인되지 않은 경력이나 역량은 작성하지 않습니다.
- 대표 프로필·연락처는 대표 사이트에 제공하고 이 사이트는 검증 과정과 근거에 집중합니다.
- 기존 About·Skills·Career·Projects·Contact 별도 주소는 유지합니다.

로컬 검토:
- 이 폴더에서 python -m http.server 8765 --bind 127.0.0.1 실행
- http://127.0.0.1:8765/index.html 접속
- 최종 검토 ZIP을 모두 풀고 HTML을 열어도 상대 경로로 검토할 수 있습니다.
- 사이트 간 연결은 실제 배포의 /qa-portfolio/ 하위 경로를 사용하므로 전체 동선 검토는 두 저장소를 같은 서버에서 대표 / 및 QA /qa-portfolio/로 제공해야 합니다.

이미지 기준:
- images/my-health-log/v1-captured/: 원본 캡처 목록 문서가 있는 V1.0.0 에뮬레이터 데모 화면
- 기존 이미지 파일은 보존했습니다. 현재 상세는 출처가 확인된 캡처만 화면 예시로 참조합니다.
- V1 화면 예시는 V3 사례의 최신 검증 증거가 아닙니다.
- 기존 개인정보를 가린 실기기 세 미리보기는 촬영 근거 영역에 동일 크기로 보존했습니다.
