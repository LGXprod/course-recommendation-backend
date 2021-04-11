const validSession = async (student_id, session_id, query) => {
  const session_ids = await query(`select null from sessions 
                                        where user_id = "${student_id}" and
                                        session_id = "${session_id}";`);
  console.log("ids", session_ids)

  return session_ids.length > 0 ? true : false;
}

module.exports = validSession;