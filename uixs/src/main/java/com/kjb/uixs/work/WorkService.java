package com.kjb.uixs.work;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkService {
	
	private final WorkMapper mapper;
	
	@Autowired
	public WorkService(SqlSession session) {
		//this.session = session;
		
		this.mapper = session.getMapper(WorkMapper.class);
	}
	
	public int insert(WorkVO workVo) throws Exception {
		mapper.insert(workVo);
		
		return 0;
	}
	
	/**
	 * 신규 아이디 저장을 위한 아이디 검색
	 * @param request_type
	 * @return
	 */
	public String selectRequestId(String request_type) {
		String request_id = mapper.selectRequestId(request_type);
		
		return request_id;
	}
	
	/**
	 * 작업요청시 선택한 ia 항목저장
	 * @param requestIaParam
	 * @throws Exception
	 */
	public void insertRequestIa(Map<String, Object> requestIaParam) throws Exception {
		mapper.insertRequestIa(requestIaParam);
	}
	
	/**
	 * 작업요청 내역
	 * @return
	 */
	public List<WorkVO> selectRequestListFromDB(WorkVO workVo) {
		return mapper.selectRequestList(workVo);
	}
	
	/**
	 * 작업요청 내역 상세정보
	 * @param request_id
	 * @return
	 */
	public WorkVO selectRequestOneFromDB(String request_id) {
		return mapper.selectRequestOne(request_id);
	}
	
	/**
	 * 작업요청 내역 상세정보
	 * @param request_id
	 * @return
	 */
	public WorkVO selectWorkOneFromDB(String request_id) {
		return mapper.selectWorkOne(request_id);
	}
	
	/**
	 * 요청 작업의 수락 혹은 거절 상태 저장
	 * @param workVo
	 * @return
	 * @throws Exception
	 */
	public int updateRequestWorkStateToDB(WorkVO workVo) throws Exception {
		return mapper.updateRequestWorkState(workVo);
	}
	
	/**
	 * 작업진행내역
	 * @return
	 */
	public List<WorkVO> selectProcessListFromDB(WorkVO workVo) {
		return mapper.selectProcessList(workVo);
	}
	
	/**
	 * 작업진행내역
	 * @return
	 */
	public List<WorkVO> selectCompleteListFromDB(String site_code) {
		return mapper.selectCompleteList(site_code);
	}
	
	/**
	 * 작업진행내역 페이징
	 * @return
	 */
	public List<WorkVO> selectCompleteListFromDB(Map<String, String> param) {
		return mapper.selectCompleteList(param);
	}
	
	/**
	 * 작업진행 항목 저장
	 * @param request_id
	 * @param state
	 * @throws Exception
	 */
	public int insertWorkListToDB(String request_id, String state) throws Exception {
		WorkVO workVo = new WorkVO(); 
		
		workVo.setRequest_id(request_id);
		workVo.setState(state);
		
		mapper.insertWorkList(workVo);
		
		return workVo.getWork_id();
	}
	
	/**
	 * 작업진행상태 저장
	 * @param workVo
	 * @throws Exception
	 */
	public void insertWorkStateToDB(WorkVO workVo) throws Exception {
		mapper.insertWorkState(workVo);
	}
	
	
	/**
	 * 작업진행상태 수정
	 * @param requestParam
	 * @throws Exception
	 */
	public int updateWorkStateToDB(WorkVO workVo) throws Exception {
		return mapper.updateWorkState(workVo);
	}
	
	/**
	 * 작업 검수요청 및 검수완료 건수
	 * @param requestParam
	 */
	public Map<String, String> selectConfirmCountFromDB(Map<String, String> param){
		return mapper.selectConfirmCount(param);
	}
	
	// 작업상태저장 태이블에서 요청작업항목 제거
	public int deleteWorkStateToDB(String request_id) throws Exception {
		return mapper.deleteWorkState(request_id);
	}
	
	// 작업목록에서 요청작업항목 제거
	public int deleteWorkListToDB(String request_id) throws Exception {
		return mapper.deleteWorkList(request_id);
	}
	
	// 달별 완료일 기준 작업요청 내역(완료일) - 조회
	public List<Map<String, Object>> selectRequestWorkWithMonth(Map<String, Object> paramMap) {
		return mapper.selectRequestWorkWithMonth(paramMap);
	}
}
