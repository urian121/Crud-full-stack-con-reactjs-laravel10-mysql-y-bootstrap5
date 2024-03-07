import PropTypes from "prop-types";

const SelectFile = ({ handleFileChange }) => {
  return (
    <input
      className="form-control form-control-sm"
      type="file"
      name="avatar"
      onChange={handleFileChange}
      accept="image/png, image/jpeg"
      required
    />
  );
};

SelectFile.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
};

export default SelectFile;
