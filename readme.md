# 리팩토링의 핵심

좋은 코드는 수정하기 쉬운 코드여야 한다

# 리팩토링의 순서

1. 코드가 하는 일을 파악하기
2. 단계 쪼개기
3. 다형성 또는 위임이 필요한 부분을 파악하여 클래스로 표현하기

최종 정리
프로젝트 통해서 경험을 쌓아 나가자
테스트를 꼭 작성
문서화식 코드 작성

추가 책:

1. Clean Code
2. Clean Architecture
3. Design Pattern

# Bad Smells in Code

기이한 이름
중복 코드 ㅠㅠ
긴 함수 => 작은 단위로
긴 매개변수 목록 => 호출 어려움, 최대 3개. 많으면 객체로. 인자 없는게 최고
전역 데이터(최악!!) => 쓰지말자
가변 데이터 => 예상치 못한 곳에서 변경됨.
뒤엉킨 변경 => 여러 곳을 수정해야 함. 책임을 분리해라
산탄총 수술 => 여러 곳에서 수정해야 함. 모듈화, 캡슐화, 디커플링
기능 편애 => 다른 모듈과 더 밀접하게 상호작용
데이터 뭉치 => 항상 함께 쓰임. 클래스 모율로 캡ㅎ=슐화
기본형 집착 => 모듈화
반복되는 switch 문 => 다형성 사용

반복문 => 파이프라인으로
오버엔지니어링 금지
임시 필드 => 질의함수. 클래스, 특이케이스 만들어 개선
메세지 체인 => 내부 로직은 캡슐화(함수나 위임으로)
중개자 제거하기
모듈 사이 데이터 거래 줄이기
너무 큰 클래스 크기 줄이기
데이터 클래스 => 데이터와 함수를 한 클래스 안으로
상속 부적절하면 위임 시도
