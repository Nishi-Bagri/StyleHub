import "./DashboardCard.css";

const DashboardCard = ({
  title,
  value,
  icon,
  color,
}) => {
  return (
    <div className="dashboard-card">
      <div
        className="dashboard-icon"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="dashboard-info">
        <h3>{title}</h3>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default DashboardCard;