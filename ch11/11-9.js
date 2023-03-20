export function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
  let highMedicalRiskFlag = false;

  if (medicalExam.isSmoker) {
    healthLevel += 10;
    highMedicalRiskFlag = true;
  }
  let certificationGrade = "regular";
  if (scoringGuide.stateWithLowCertification(candidate.originState)) {
    certificationGrade = "low";
    result -= 5;
  }
  // lots more code like this
  result -= Math.max(healthLevel - 5, 0);
  return result;
}

export class ScoringGuide {
  stateWithLowCertification(state) {
    return state < 5;
  }
}

//================================================================
export function score(candidate, medicalExam, scoringGuide) {
  return new ScoreCalc(candidate, medicalExam, scoringGuide).getScore();
}
//================================================================
export class ScoreCalc {
  constructor(candidate, medicalExam, scoringGuide) {
    this.result = 0;
    this.healthLevel = 0;
    this.highMedicalRiskFlag = false;
    this.candidate = candidate;
    this.medicalExam = medicalExam;
    this.scoringGuide = scoringGuide;
    this.certificationGrade = "regular";
  }

  getScore() {
    this.addSmokerCondition();

    this.addLowCertCondition();

    this.result -= Math.max(this.healthLevel - 5, 0);
    return this.result;
  }

  addSmokerCondition() {
    if (this.medicalExam.isSmoker) {
      this.healthLevel += 10;
      this.highMedicalRiskFlag = true;
    }
  }

  addLowCertCondition() {
    if (
      this.scoringGuide.stateWithLowCertification(this.candidate.originState)
    ) {
      this.certificationGrade = "low";
      this.result -= 5;
    }
  }
}
