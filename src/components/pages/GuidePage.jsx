import React, { useState, useEffect } from "react";
import HeroSection from "@/components/organisms/HeroSection";
import PrerequisitesSection from "@/components/organisms/PrerequisitesSection";
import StepsSection from "@/components/organisms/StepsSection";
import ProTipsSection from "@/components/organisms/ProTipsSection";
import StickyNavigation from "@/components/organisms/StickyNavigation";
import ProgressBar from "@/components/atoms/ProgressBar";
import { guideService } from "@/services/api/guideService";

const GuidePage = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const loadSteps = async () => {
    try {
      setLoading(true);
      const data = await guideService.getSteps();
      setSteps(data);
    } catch (err) {
      console.error("Error loading steps:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSteps();
  }, []);

  const handleUpdateStep = (updatedStep) => {
    setSteps(prev => 
      prev.map(step => 
        step.id === updatedStep.id ? updatedStep : step
      )
    );
  };

  const completedSteps = steps.filter(step => step.isCompleted).length;
  const totalSteps = steps.length;
return (
    <div className="min-h-screen bg-white">
{/* Progress Bar at Top */}
      {!loading && totalSteps > 0 && showProgressBar && (
        <ProgressBar 
          completedSteps={completedSteps}
          totalSteps={totalSteps}
          onClose={() => setShowProgressBar(false)}
        />
      )}

      {/* Hero Section */}
      <div className="pt-20">
        <HeroSection />
      </div>

      {/* Prerequisites Section */}
      <PrerequisitesSection />

{/* Steps Section */}
      <div id="steps">
        <StepsSection 
          steps={steps}
          loading={loading}
          onUpdateStep={handleUpdateStep}
          onRetry={loadSteps}
        />
      </div>

      {/* Pro Tips Section */}
      <div id="pro-tips">
        <ProTipsSection />
      </div>

      {/* Sticky Navigation */}
      <StickyNavigation />
    </div>
  );
};

export default GuidePage;