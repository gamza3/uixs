package com.kjb.uixs.work;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.kjb.uixs.SqlMapper;

@SqlMapper
public interface WorkMapper {
	public int insert(WorkVO workVo) throws Exception;
	
	/**
	 * 신규 아이디 저장을 위한 아이디 검색
	 * @param request_type
	 * @return
	 */
	public String selectRequestId(String request_type);
	
	/**
	 * 작업요청 에서 선택한 ia 항목 저장
	 * @param requestIaParam
	 * @throws Exception
	 */
	public void insertRequestIa(Map<String, Object> requestIaParam) throws Exception;
	
	// 작업요청내역
	public List<WorkVO> selectRequestList(WorkVO workVo);
	
	// 작업요청내역 상세 select
	public WorkVO selectRequestOne(String request_id);
	
	// 작업요청내역 상세 select
	public WorkVO selectWorkOne(String request_id);
	
	// 작업요청 수용여부 수정
	public int updateRequestWorkState(WorkVO workVo) throws Exception;
	
	// 진행중인 작업록록 
	public List<WorkVO> selectProcessList(WorkVO workVo);
	
	// 완료된 작업록록 
	public List<WorkVO> selectCompleteList(String site_code);
	
	// 완료된 작업목록 페이징
	public List<WorkVO> selectCompleteList(Map<String, String> param);
	
	// 진행중인 작업 항목 저장
	public int insertWorkList(WorkVO wrokVo) throws Exception;
	
	// 작업진행 상태 저장
	public void insertWorkState(WorkVO workVo) throws Exception;
	
	// 작업진행상태 업데이트
	public int updateWorkState(WorkVO workVo) throws Exception;
	
	// 검수요청 및 검수완료 건수
	public Map<String, String> selectConfirmCount(Map<String, String> param);
	
	// 작업상태 저장태이블에서 해당 요청작업 삭제
	public int deleteWorkState(String request_id) throws Exception;
	
	// 작업목록 저장태이블에서 해당 요청작업 삭제
	public int deleteWorkList(String request_id) throws Exception;
	
	// 달별 완료일 기준 작업요청 내역(완료일) - 조회
	public List<Map<String, Object>> selectRequestWorkWithMonth(Map<String, Object> paramMap);
}
