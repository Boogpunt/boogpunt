# Boogpunt — Typography Reference

**Font**: Neue Haas Grotesk Text (`neue-haas-grotesk-text`, Typekit: `ifp8ucb`)  
**Letter-spacing**: `-0.02em` 전체 통일  
**Color**: `var(--fg)` = `#000000` (index mode / dark bg hover 시 white 반전)

---

## Style Catalogue

| Style Name       | Size          | Weight | Line-height | Letter-spacing | 사용 위치 |
|------------------|---------------|--------|-------------|----------------|-----------|
| **Body**         | 16px          | 700    | 1.1         | -0.02em        | 기본값 (전체 상속) |
| **Nav Logo**     | 16px (상속)   | 700    | -           | -0.02em        | 좌측 Boogpunt 로고 |
| **Nav Link**     | 16px (상속)   | 700    | -           | -0.02em        | Works / Index / About / Contact |
| **Filter Btn**   | 16px (상속)   | 700    | -           | -0.02em        | Works 하위 카테고리 버튼 (All / Branding / Graphic / Typeface / Installation) |
| **Disc Label**   | 16px          | 700    | -           | -0.02em        | 원형 디스크 카테고리 라벨 (GRAPHIC 등), UPPERCASE |
| **Index Arc**    | 16px (동적 SVG) | 400  | -           | -0.02em        | Index 모드 원형 arc 텍스트 4줄 |
| **Card Meta**    | 12px          | 700    | 1.3         | -0.02em        | 필터 오버레이 썸네일 캡션 |
| **About Title**  | 24px          | 700    | 1.0         | -0.02em        | About 패널 상단 제목 (Boogpunt) |
| **About Body**   | 16px          | 700    | 1.1         | -0.02em        | About 패널 bio 단락 |
| **About Label**  | 16px          | 700    | 1.1         | -0.02em        | About 테이블 왼쪽 라벨 (Awards 등) |
| **About Items**  | 16px          | 700    | 1.1         | -0.02em        | About 테이블 항목 텍스트 |
| **Project Title**| clamp(48px, 12.5vw, 220px) | 700 | 1.0 | -0.02em | 상세페이지 대형 타이틀 |
| **Project Credits** | 16px       | 700    | 1.1         | -0.02em        | 상세페이지 크레딧 (Client / Director 등) |

---

## CSS Class Map

```
body                → Body
.nav-logo           → Nav Logo
.nav-link           → Nav Link
.filter-btn         → Filter Btn
.disc-label         → Disc Label
.index-text         → Index Arc  (font-size는 JS에서 SVG 단위로 설정)
.card-meta          → Card Meta
.info-title         → About Title
.info-body          → About Body
.info-label         → About Label
.info-items p       → About Items
.project-title      → Project Title
.project-credits-row p → Project Credits
```

---

## Notes

- Index Arc 텍스트의 font-size는 `updateLabelPos()`에서 `16 / scale` SVG 단위로 동적 계산됨 (화면 크기 무관하게 실제 16px 렌더링)
- `letter-spacing`은 body에서 `-0.02em` 상속 → 개별 오버라이드 없음
- Index mode / dark bg hover 시 흰색 반전: `.nav-logo`, `.nav-link`, `.disc-label` 등
