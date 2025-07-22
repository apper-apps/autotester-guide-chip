import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProTipCard from "@/components/molecules/ProTipCard";
import { guideService } from "@/services/api/guideService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ProTipsSection = () => {
  const [proTips, setProTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sectionRef, isIntersecting, hasIntersected] = useIntersectionObserver();

  const loadProTips = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await guideService.getProTips();
      setProTips(data);
    } catch (err) {
      setError("Failed to load pro tips. Please try again.");
      console.error("Error loading pro tips:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProTips();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProTips} />;

  return (
    <section 
      ref={sectionRef}
      className={`py-20 bg-white section-fade ${hasIntersected ? "visible" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">
              🎯 Pro Tips for Success
            </h2>
            <p className="text-xl text-gray-600 font-body max-w-3xl mx-auto">
              Expert advice to help you get the most out of AutoTester and create robust automated tests
            </p>
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {proTips.map((proTip, index) => (
              <motion.div
                key={proTip.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: hasIntersected ? 1 : 0, 
                  y: hasIntersected ? 0 : 30 
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProTipCard proTip={proTip} />
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: hasIntersected ? 1 : 0, 
              y: hasIntersected ? 0 : 20 
            }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-6">
                You now have everything you need to create your first automated test with AutoTester!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Install Chrome Extension
                </button>
                <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-200">
                  View Documentation
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProTipsSection;