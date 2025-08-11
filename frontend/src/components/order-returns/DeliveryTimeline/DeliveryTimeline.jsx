import React from 'react';
// Import the icons we'll need for each step
import { ShoppingBasket, Truck, CheckCircle } from 'lucide-react';
import './DeliveryTimeline.css';

// Define the steps of the timeline. This makes it easy to manage.
const STEPS = [
  { title: 'Order Placed', icon: <ShoppingBasket size={20} /> },
  { title: 'In Transit', icon: <Truck size={20} /> },
  { title: 'Completed', icon: <CheckCircle size={20} /> },
];

const DeliveryTimeline = ({ currentStatus }) => {
  // Find the index of the current active step.
  // We use .findIndex() which is perfect for this.
  const currentStepIndex = STEPS.findIndex(step => step.title === currentStatus);

  return (
    <div className="info-card">
      {/* The component now has a fixed title, as it's specialized */}
      <h3 className="info-card-title">Delivery Progress</h3>
      
      <div className="timeline-horizontal-container">
        {STEPS.map((step, index) => {
          // Determine the status of each step based on the index
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isPending = index > currentStepIndex;

          // Build the class names dynamically for styling
          const stepClasses = [
            'timeline-step',
            isCompleted && 'completed',
            isCurrent && 'current',
            isPending && 'pending',
          ].filter(Boolean).join(' '); // .filter(Boolean) removes any false values

          return (
            <div key={step.title} className={stepClasses}>
              <div className="step-top-row">
                {/* The icon circle */}
                <div className="step-icon-wrapper">
                  {step.icon}
                </div>
                {/* The connecting line (not shown for the last step) */}
                {index < STEPS.length - 1 && <div className="step-line" />}
              </div>
              {/* The label below the icon */}
              <div className="step-label">
                {step.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryTimeline;