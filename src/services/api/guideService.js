import guideData from "@/services/mockData/guideData.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const guideService = {
  async getSteps() {
    await delay(300);
    return [...guideData.steps];
  },

  async getPrerequisites() {
    await delay(200);
    return [...guideData.prerequisites];
  },

  async getProTips() {
    await delay(200);
    return [...guideData.proTips];
  },

  async updateStepCompletion(stepId, isCompleted) {
    await delay(100);
    const stepIndex = guideData.steps.findIndex(step => step.id === stepId);
    if (stepIndex !== -1) {
      guideData.steps[stepIndex].isCompleted = isCompleted;
      return { ...guideData.steps[stepIndex] };
    }
    throw new Error("Step not found");
  },

  async updateStepExpansion(stepId, isExpanded) {
    await delay(50);
    const stepIndex = guideData.steps.findIndex(step => step.id === stepId);
    if (stepIndex !== -1) {
      guideData.steps[stepIndex].isExpanded = isExpanded;
      return { ...guideData.steps[stepIndex] };
    }
    throw new Error("Step not found");
  },

  async updatePrerequisiteCheck(prereqId, isChecked) {
    await delay(100);
    const prereqIndex = guideData.prerequisites.findIndex(prereq => prereq.id === prereqId);
    if (prereqIndex !== -1) {
      guideData.prerequisites[prereqIndex].isChecked = isChecked;
      return { ...guideData.prerequisites[prereqIndex] };
    }
    throw new Error("Prerequisite not found");
  }
};