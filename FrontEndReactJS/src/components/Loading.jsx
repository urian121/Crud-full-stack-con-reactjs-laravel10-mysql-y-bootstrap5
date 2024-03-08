const Loading = () => {
  return (
    <>
      <div className="page-loading active">
        <div className="page-loading-inner">
          <div className="page-spinner"></div>
          <span>Enviando formulario...</span>
        </div>
      </div>
    </>
  );
};

export default Loading;
