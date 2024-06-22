const BlogCategoryModel = require("../../model/blogs/blogcategoryModel");

const createMainCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const mainCategory = new BlogCategoryModel({ name });
    await mainCategory.save();
    res.status(201).json(mainCategory);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createSubCategory = async (req, res) => {
  try {
    const { mainCategoryId } = req.params;
    const { name } = req.body;
    const mainCategory = await BlogCategoryModel.findById(mainCategoryId);
    if (!mainCategory)
      return res
        .status(404)
        .json({ success: false, message: "Main Category not found" });

    mainCategory.subCategories.push({ name });
    await mainCategory.save();
    res.status(201).json({ success: false, data: mainCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createSubSubCategory = async (req, res) => {
  try {
    const { mainCategoryId, subCategoryId } = req.params;
    const { name } = req.body;
    const mainCategory = await BlogCategoryModel.findById(mainCategoryId);
    if (!mainCategory)
      return res
        .status(404)
        .json({ success: false, message: "Main Category not found" });

    const subCategory = mainCategory.subCategories.id(subCategoryId);
    if (!subCategory)
      return res
        .status(404)
        .json({ success: false, message: "Sub Category not found" });

    subCategory.subSubCategories.push({ name });
    await mainCategory.save();
    res.status(201).json({ success: false, data: mainCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createInnerCategory = async (req, res) => {
  try {
    const { mainCategoryId, subCategoryId, subSubCategoryId } = req.params;
    const { name } = req.body;
    const mainCategory = await BlogCategoryModel.findById(mainCategoryId);
    if (!mainCategory)
      return res
        .status(404)
        .json({ success: false, message: "Main Category not found" });

    const subCategory = mainCategory.subCategories.id(subCategoryId);
    if (!subCategory)
      return res
        .status(404)
        .json({ success: false, message: "Sub Category not found" });

    const subSubCategory = subCategory.subSubCategories.id(subSubCategoryId);
    if (!subSubCategory)
      return res
        .status(404)
        .json({ success: false, message: "Sub Sub-Category not found" });

    subSubCategory.innerCategories.push({ name });
    await mainCategory.save();
    res.status(201).json({ success: true, data: mainCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMainCategory = async (req, res) => {
  try {
    const { mainCategoryId } = req.params;
    const { name } = req.body;
    const mainCategory = await BlogCategoryModel.findByIdAndUpdate(
      mainCategoryId,
      { name },
      { new: true }
    );
    if (!mainCategory)
      return res.status(404).json({ message: "Main Category not found" });
    res.status(200).json({success:true,data:mainCategory});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const { mainCategoryId, subCategoryId } = req.params;
    const { name } = req.body;
    const mainCategory = await BlogCategoryModel.findById(mainCategoryId);
    if (!mainCategory)
      return res.status(404).json({ message: "Main Category not found" });

    const subCategory = mainCategory.subCategories.id(subCategoryId);
    if (!subCategory)
      return res.status(404).json({ message: "Sub Category not found" });

    subCategory.name = name;
    await mainCategory.save();
    res.status(200).json(mainCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSubSubCategory = async (req, res) => {
  try {
    const { mainCategoryId, subCategoryId, subSubCategoryId } = req.params;
    const { name } = req.body;
    const mainCategory = await BlogCategoryModel.findById(mainCategoryId);
    if (!mainCategory)
      return res.status(404).json({ message: "Main Category not found" });

    const subCategory = mainCategory.subCategories.id(subCategoryId);
    if (!subCategory)
      return res.status(404).json({ message: "Sub Category not found" });

    const subSubCategory = subCategory.subSubCategories.id(subSubCategoryId);
    if (!subSubCategory)
      return res.status(404).json({ message: "Sub Sub-Category not found" });

    subSubCategory.name = name;
    await mainCategory.save();
    res.status(200).json(mainCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInnerCategory = async (req, res) => {
  try {
    const { mainCategoryId, subCategoryId, subSubCategoryId, innerCategoryId } =
      req.params;
    const { name } = req.body;
    const mainCategory = await BlogCategoryModel.findById(mainCategoryId);
    if (!mainCategory)
      return res.status(404).json({ message: "Main Category not found" });

    const subCategory = mainCategory.subCategories.id(subCategoryId);
    if (!subCategory)
      return res.status(404).json({ message: "Sub Category not found" });

    const subSubCategory = subCategory.subSubCategories.id(subSubCategoryId);
    if (!subSubCategory)
      return res.status(404).json({ message: "Sub Sub-Category not found" });

    const innerCategory = subSubCategory.innerCategories.id(innerCategoryId);
    if (!innerCategory)
      return res.status(404).json({ message: "Inner Category not found" });

    innerCategory.name = name;
    await mainCategory.save();
    res.status(200).json(mainCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMainCategory = async (req, res) => {
  try {
    const { mainCategoryId } = req.params;
    const mainCategory = await BlogCategoryModel.findByIdAndDelete(
      mainCategoryId
    );
    if (!mainCategory)
      return res.status(404).json({ message: "Main Category not found" });
    res.status(200).json({ message: "Main Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { mainCategoryId, subCategoryId } = req.params;
    const mainCategory = await BlogCategoryModel.findById(mainCategoryId);
    if (!mainCategory)
      return res.status(404).json({ message: "Main Category not found" });

    const subCategory = mainCategory.subCategories.id(subCategoryId);
    if (!subCategory)
      return res.status(404).json({ message: "Sub Category not found" });

    subCategory.deleteOne();
    await mainCategory.save();
    res.status(200).json(mainCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubSubCategory = async (req, res) => {
  try {
    const { mainCategoryId, subCategoryId, subSubCategoryId } = req.params;
    const mainCategory = await BlogCategoryModel.findById(mainCategoryId);
    if (!mainCategory)
      return res.status(404).json({ message: "Main Category not found" });

    const subCategory = mainCategory.subCategories.id(subCategoryId);
    if (!subCategory)
      return res.status(404).json({ message: "Sub Category not found" });

    const subSubCategory = subCategory.subSubCategories.id(subSubCategoryId);
    if (!subSubCategory)
      return res.status(404).json({ message: "Sub Sub-Category not found" });

    subSubCategory.deleteOne();
    await mainCategory.save();
    res.status(200).json(mainCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInnerCategory = async (req, res) => {
  try {
    const { mainCategoryId, subCategoryId, subSubCategoryId, innerCategoryId } =
      req.params;
    const mainCategory = await BlogCategoryModel.findById(mainCategoryId);
    if (!mainCategory)
      return res.status(404).json({ message: "Main Category not found" });

    const subCategory = mainCategory.subCategories.id(subCategoryId);
    if (!subCategory)
      return res.status(404).json({ message: "Sub Category not found" });

    const subSubCategory = subCategory.subSubCategories.id(subSubCategoryId);
    if (!subSubCategory)
      return res.status(404).json({ message: "Sub Sub-Category not found" });

    const innerCategory = subSubCategory.innerCategories.id(innerCategoryId);
    if (!innerCategory)
      return res.status(404).json({ message: "Inner Category not found" });

    innerCategory.deleteOne();
    await mainCategory.save();
    res.status(200).json(mainCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const GetBlogCategory = async (req, res) => {
  try {
    const response = await BlogCategoryModel.find();
    if (!response)
      return res
        .status(404)
        .json({ success: false, message: "Category Not Found" });

    res.status(201).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createMainCategory,
  createSubCategory,
  createSubSubCategory,
  createInnerCategory,
  GetBlogCategory,
  updateMainCategory,
  updateSubCategory,
  updateSubSubCategory,
  updateInnerCategory,
  deleteMainCategory,
  deleteSubCategory,
  deleteSubSubCategory,
  deleteInnerCategory,
};
