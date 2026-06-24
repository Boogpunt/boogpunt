# Boogpunt — Typography Reference

**Font**: Neue Haas Grotesk Text (`neue-haas-grotesk-text`, Typekit: `ifp8ucb`)  
**Color**: `var(--fg)` = `#000000` (index mode / dark bg hover 시 white 반전)

---

## Style Catalogue

| Style Name       | Size    | Weight | Line-height | Letter-spacing | 사용 위치 |
|------------------|---------|--------|-------------|----------------|-----------|
| **Body**         | 16px    | 700    | 1.1         | -0.02em        | 기본값 전체 상속 → Nav Logo, Nav Link, Filter Btn, Disc Label, About Body/Label/Items, Project Header Sub, Project Credits |
| **Body Arc**     | 16px (동적 SVG) | 400 | -      | -0.02em        | Index 모드 원형 arc 텍스트 4줄 |
| **Caption**      | 12px    | 700    | 1.3         | -0.02em        | 필터 오버레이 썸네일 캡션, 상세페이지 크레딧 (직책/이름) |
| **About Title**  | 24px    | 700    | 1.0         | -0.02em        | About 패널 상단 제목 (Boogpunt) |
| **Project Title**| 16vw    | 700    | 1.0         | -0.05em        | 상세페이지 대형 타이틀 |

---

## CSS Class Map

```
body                → Body (cascade base)
.nav-logo           → Body
.nav-link           → Body
.filter-btn         → Body
.disc-label         → Body  (text-transform: uppercase)
.index-text         → Body Arc  (font-size는 JS에서 SVG 단위로 설정, weight 400)
.caption            → Caption  (상세페이지 크레딧 등)
.card-meta          → Caption  (필터 오버레이 썸네일 캡션)
.info-title         → About Title
.info-body          → Body
.info-label         → Body
.info-items p       → Body
.project-title      → Project Title
.project-header-sub → Body  (flex space-between: Client. SK enmove / 2023)
.project-credit-entry p → Caption
```

---

## Notes

- Body Arc의 font-size는 `updateLabelPos()`에서 `16 / scale` SVG 단위로 동적 계산됨 (화면 크기 무관하게 실제 16px 렌더링)
- `letter-spacing`은 body에서 `-0.02em` 상속 → Project Title만 `-0.05em`으로 독립 설정
- Index mode / dark bg hover 시 흰색 반전: `.nav-logo`, `.nav-link`, `.disc-label`, `.index-text` 등
- 모바일에서 `.project-title`은 `white-space: normal` (줄바꿈 허용), `.project-credits`는 `width: 100%`
