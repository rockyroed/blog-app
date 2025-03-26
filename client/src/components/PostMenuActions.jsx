import DeleteIcon from "./DeleteIcon";
import SaveIcon from "./SaveIcon";

const PostMenuActions = () => {
  return (
    <div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
      <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
        <SaveIcon />
        <span>Save this Post</span>
      </div>
      <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
        <DeleteIcon />
        <span>Delete this Post</span>
      </div>
    </div>
  );
};

export default PostMenuActions;
