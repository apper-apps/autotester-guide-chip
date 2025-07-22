import React from "react";
import HeroSection from "@/components/organisms/HeroSection";
import PrerequisitesSection from "@/components/organisms/PrerequisitesSection";
import StepsSection from "@/components/organisms/StepsSection";
import ProTipsSection from "@/components/organisms/ProTipsSection";
import StickyNavigation from "@/components/organisms/StickyNavigation";

const GuidePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Prerequisites Section */}
      <PrerequisitesSection />

      {/* Steps Section */}
      <div id="steps">
        <StepsSection />
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