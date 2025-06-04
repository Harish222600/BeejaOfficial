import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { adminEndpoints } from "../apis"

const {
  GET_ALL_USERS_API,
  CREATE_USER_API,
  UPDATE_USER_API,
  DELETE_USER_API,
  TOGGLE_USER_STATUS_API,
  GET_ALL_COURSES_API,
  APPROVE_COURSE_API,
  DELETE_COURSE_API,
  TOGGLE_COURSE_VISIBILITY_API,
  SET_COURSE_TYPE_API,
  GET_ANALYTICS_API,
} = adminEndpoints

// ================ Set Course Type ================
export const setCourseType = async (courseId, courseType, token) => {
  const toastId = toast.loading("Updating course type...")
  let result = null

  try {
    const url = SET_COURSE_TYPE_API.replace(':courseId', courseId)
    
    const response = await apiConnector("PUT", url, { courseType }, {
      Authorization: `Bearer ${token}`,
    })
    
    console.log("SET_COURSE_TYPE_API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Type")
    }

    toast.success("Course type updated successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("SET_COURSE_TYPE_API ERROR............", error)
    toast.error(error.message)
  }
  
  toast.dismiss(toastId)
  return result
}

// ================ Get All Users ================
export const getAllUsers = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
      Authorization: `Bearer ${token}`,
    })
    
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Users")
    }
    
    result = response?.data?.users
  } catch (error) {
    console.log("GET_ALL_USERS_API ERROR............", error)
    toast.error(error.message)
  }
  
  toast.dismiss(toastId)
  return result
}

// ================ Create User ================
export const createUser = async (data, token) => {
  const toastId = toast.loading("Creating user...")
  let result = null

  try {
    const response = await apiConnector("POST", CREATE_USER_API, data, {
      Authorization: `Bearer ${token}`,
    })
    
    console.log("CREATE_USER_API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Create User")
    }

    toast.success("User created successfully")
    result = response?.data?.user
  } catch (error) {
    console.log("CREATE_USER_API ERROR............", error)
    toast.error(error.message)
  }
  
  toast.dismiss(toastId)
  return result
}

// ================ Update User ================
export const updateUser = async (userId, data, token) => {
  const toastId = toast.loading("Updating user...")
  let result = null

  try {
    const url = UPDATE_USER_API.replace(':userId', userId)
    
    const response = await apiConnector("PUT", url, data, {
      Authorization: `Bearer ${token}`,
    })
    
    console.log("UPDATE_USER_API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Update User")
    }

    toast.success("User updated successfully")
    result = response?.data?.user
  } catch (error) {
    console.log("UPDATE_USER_API ERROR............", error)
    toast.error(error.message)
  }
  
  toast.dismiss(toastId)
  return result
}

// ================ Delete User ================
export const deleteUser = async (userId, token) => {
  const toastId = toast.loading("Deleting user...")
  let result = false

  try {
    const url = DELETE_USER_API.replace(':userId', userId)
    
    const response = await apiConnector("DELETE", url, null, {
      Authorization: `Bearer ${token}`,
    })
    
    console.log("DELETE_USER_API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Delete User")
    }

    toast.success("User deleted successfully")
    result = true
  } catch (error) {
    console.log("DELETE_USER_API ERROR............", error)
    toast.error(error.message)
  }
  
  toast.dismiss(toastId)
  return result
}

// ================ Toggle User Status ================
export const toggleUserStatus = async (userId, token) => {
  const toastId = toast.loading("Updating user status...")
  let result = null

  try {
    const url = TOGGLE_USER_STATUS_API.replace(':userId', userId)
    
    const response = await apiConnector("PUT", url, null, {
      Authorization: `Bearer ${token}`,
    })
    
    console.log("TOGGLE_USER_STATUS_API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Update User Status")
    }

    toast.success("User status updated successfully")
    result = response?.data?.user
  } catch (error) {
    console.log("TOGGLE_USER_STATUS_API ERROR............", error)
    toast.error(error.message)
  }
  
  toast.dismiss(toastId)
  return result
}

// ================ Get All Courses ================
export const getAllCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("GET", GET_ALL_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    })
    
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Courses")
    }
    
    result = response?.data?.courses
  } catch (error) {
    console.log("GET_ALL_COURSES_API ERROR............", error)
    toast.error(error.message)
  }
  
  toast.dismiss(toastId)
  return result
}

// ================ Approve Course ================
export const approveCourse = async (courseId, token) => {
  const toastId = toast.loading("Approving course...")
  let result = null

  try {
    const url = APPROVE_COURSE_API.replace(':courseId', courseId)
    
    const response = await apiConnector("PUT", url, null, {
      Authorization: `Bearer ${token}`,
    })
    
    console.log("APPROVE_COURSE_API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Approve Course")
    }

    toast.success("Course approved successfully")
    result = response?.data?.course
  } catch (error) {
    console.log("APPROVE_COURSE_API ERROR............", error)
    toast.error(error.message)
  }
  
  toast.dismiss(toastId)
  return result
}

// ================ Delete Course ================
export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("Deleting course...")
  let result = false

  try {
    const url = DELETE_COURSE_API.replace(':courseId', courseId)
    
    const response = await apiConnector("DELETE", url, null, {
      Authorization: `Bearer ${token}`,
    })
    
    console.log("DELETE_COURSE_API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }

    toast.success("Course deleted successfully")
    result = true
  } catch (error) {
    console.log("DELETE_COURSE_API ERROR............", error)
    toast.error(error.message)
  }
  
  toast.dismiss(toastId)
  return result
}

// ================ Toggle Course Visibility ================
export const toggleCourseVisibility = async (courseId, token) => {
  const toastId = toast.loading("Updating course visibility...")
  let result = null

  try {
    const url = TOGGLE_COURSE_VISIBILITY_API.replace(':courseId', courseId)
    
    const response = await apiConnector("PUT", url, null, {
      Authorization: `Bearer ${token}`,
    })
    
    console.log("TOGGLE_COURSE_VISIBILITY_API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Visibility")
    }

    toast.success("Course visibility updated successfully")
    result = response?.data?.course
  } catch (error) {
    console.log("TOGGLE_COURSE_VISIBILITY_API ERROR............", error)
    toast.error(error.message)
  }
  
  toast.dismiss(toastId)
  return result
}

// ================ Get Analytics ================
export const getAnalytics = async (token) => {
  let result = null
  const toastId = toast.loading("Loading analytics...")

  try {
    const response = await apiConnector("GET", GET_ANALYTICS_API, null, {
      Authorization: `Bearer ${token}`,
    })
    
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Analytics")
    }
    
    result = response?.data?.analytics
  } catch (error) {
    console.log("GET_ANALYTICS_API ERROR............", error)
    toast.error(error.message)
  }
  
  toast.dismiss(toastId)
  return result
}
