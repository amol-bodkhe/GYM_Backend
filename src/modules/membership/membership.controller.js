const add = async (req, res) => {
  try {
    const membership = await membershipService.add(req.body);

    return res.status(201).json({
      success: true,
      data: membership
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports={ add,updateMembership, deleteMembership}