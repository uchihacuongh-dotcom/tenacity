const MissionObjective = ({ missionNumber, objective, hint }) => {
  return (
    <div style={{ fontSize: '24px', textAlign: 'center' }}>
      <strong>Mục tiêu nhiệm vụ {missionNumber}</strong>
      <br/>
      {objective}
      {
        hint &&
        <div style={{ fontSize: '18px', textAlign: 'center' }}>
          <hr/>
          {hint}
          <br/>
        </div>
      }
    </div>
  );
}

export default MissionObjective;